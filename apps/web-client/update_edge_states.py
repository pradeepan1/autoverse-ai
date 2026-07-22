import re

def update_file():
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add error state to useState
    old_state = "const [isLoading, setIsLoading] = useState(true);"
    new_state = "const [isLoading, setIsLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);"
    content = content.replace(old_state, new_state)

    # Add error setting
    old_catch = """      } catch (err) {
        console.error(err);
      } finally {"""
    new_catch = """      } catch (err) {
        console.error(err);
        setError("Failed to load featured vehicles.");
      } finally {"""
    content = content.replace(old_catch, new_catch)

    # Handle empty/error in featured cars
    old_cars_div = """          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(isLoading ? Array(3).fill(null) : cars).map((car, idx) => {"""
    
    new_cars_div = """          {error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
              <p>{error}</p>
            </div>
          ) : !isLoading && cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl">
              <p className="text-[var(--text-secondary)]">No featured vehicles available at the moment.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(isLoading ? Array(3).fill(null) : cars).map((car, idx) => {"""
            
    content = content.replace(old_cars_div, new_cars_div)
    
    # Close the ternary operator for cars
    old_cars_close = """              </article>
              );
            })}
          </div>"""
    new_cars_close = """              </article>
              );
            })}
          </div>
          )}"""
    content = content.replace(old_cars_close, new_cars_close)
    
    # Handle empty/error in categories
    old_cats_div = """          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {(isLoading ? Array(4).fill(null) : categories).map((cat, idx) => {"""
            
    new_cats_div = """          {error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
              <p>Failed to load categories.</p>
            </div>
          ) : !isLoading && categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl">
              <p className="text-[var(--text-secondary)]">No categories available at the moment.</p>
            </div>
          ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {(isLoading ? Array(4).fill(null) : categories).map((cat, idx) => {"""
    content = content.replace(old_cats_div, new_cats_div)
    
    old_cats_close = """              </Link>
            )})}
          </div>"""
    new_cats_close = """              </Link>
            )})}
          </div>
          )}"""
    content = content.replace(old_cats_close, new_cats_close)

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_file()
    print("Done handling edge states")
