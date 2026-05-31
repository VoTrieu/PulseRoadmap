def paginate(items: list, total: int, skip: int, take: int) -> dict:
    total_pages = (total + take - 1) // take if total else 0
    page = (skip // take) + 1 if total else 1

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": take,
        "total_pages": total_pages,
    }