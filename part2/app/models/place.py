from app.models.base import BaseModel

class Place(BaseModel):
    def __init__(self, title, description, price, owner):
        super().__init__()
        self.title = title
        self.description = description
        self.price = price
        self.owner = owner  # User obyekti
        self.amenities = [] # Amenity siyahısı

    def add_amenity(self, amenity):
        self.amenities.append(amenity)
