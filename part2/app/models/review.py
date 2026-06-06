from app.models.base import BaseModel

class Review(BaseModel):
    def __init__(self, text, rating, user, place):
        super().__init__()
        self.text = text
        self.rating = rating  # Məsələn: 1-5 arası
        self.user = user      # User obyekti
        self.place = place    # Place obyekti
