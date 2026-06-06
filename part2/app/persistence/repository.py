class InMemoryRepository:
    def __init__(self):
        self._storage = {}

    def save(self, key, data):
        self._storage[key] = data
        return data

    def get(self, key):
        return self._storage.get(key)

# Qlobal bir repository obyekti yarada bilərsən
repo = InMemoryRepository()
