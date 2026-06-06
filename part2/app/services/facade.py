from app.models.user import User
from app.persistence.repository import repo

class HBnBFacade:
    def create_user(self, user_data):
        # Dataları alıb User obyektinə çeviririk
        new_user = User(
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            email=user_data['email']
        )
        return repo.save(new_user)from app.persistence.repository import repo

class HBnBFacade:
    def create_user(self, user_data):
        # Burada biznes məntiqi və ya validasiya ola bilər
        return repo.save(user_data['email'], user_data)

    def get_user(self, email):
        return repo.get(email)

# Tətbiq boyu istifadə etmək üçün
facade = HBnBFacade()
