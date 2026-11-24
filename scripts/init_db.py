import os
from pathlib import Path

import psycopg2


def main():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is required")

    sql_path = Path(__file__).resolve().parent.parent / "db" / "init.sql"
    sql = sql_path.read_text(encoding="utf-8")

    with psycopg2.connect(database_url) as conn:
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()

    print("Database initialized successfully.")


if __name__ == "__main__":
    main()
