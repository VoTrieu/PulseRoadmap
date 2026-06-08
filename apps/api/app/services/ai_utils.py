from collections.abc import Callable


def top_label[T](items: list[T], get_label: Callable[[T], str]) -> str | None:
    counts: dict[str, int] = {}

    for item in items:
        label = get_label(item)
        counts[label] = counts.get(label, 0) + 1

    if not counts:
        return None

    return sorted(counts.items(), key=lambda item: (-item[1], item[0]))[0][0]
