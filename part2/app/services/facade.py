from app.persistence.repository import repo

class HBnBFacade:
    def create_user(self, user_data):
        # Burada biznes məntiqi və ya validasiya ola bilər
        return repo.save(user_data['email'], user_data)

    def get_user(self, email):
        return repo.get(email)

# Tətbiq boyu istifadə etmək üçün
facade = HBnBFacade()
