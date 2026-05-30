def paginate(items: list, total: int, skip: int, take: int) -> dict:
    """
    Helper function to build pagination metadata.
    
    Args:
        items: List of items for current page
        total: Total count of all items
        skip: Number of items skipped
        take: Number of items per page
    
    Returns:
        Dictionary with pagination data ready for PaginatedResponse
    """
    #otal_pages = (25 + 5 - 1) // 5 = 5
    total_pages = (total + take - 1) // take  # Ceiling division
    #page = (10 // 5) + 1 = 3
    page = (skip // take) + 1
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": take,
        "total_pages": total_pages,
    }
