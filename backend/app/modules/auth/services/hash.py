import bcrypt


class PasswordHasher:
    @staticmethod
    def hash_password(password: str) -> str:
        # bcrypt expects bytes for both password and salt
        pwd_bytes = password.encode("utf-8")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(pwd_bytes, salt)
        return hashed.decode("utf-8")

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        pwd_bytes = password.encode("utf-8")
        try:
            hashed_bytes = hashed_password.encode("utf-8")
            return bcrypt.checkpw(pwd_bytes, hashed_bytes)
        except Exception:
            return False
