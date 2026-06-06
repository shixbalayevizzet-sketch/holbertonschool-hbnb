@api.route('/')
class UserList(Resource):
    def post(self):
        data = api.payload
        user = facade.create_user(data)
        # Obyekti JSON formatına çevirib qaytarmaq üçün bir metod əlavə edə bilərsən
        return {"id": user.id, "email": user.email}, 201from flask_restx import Resource, Namespace
from app.services.facade import facade

api = Namespace('users', description='User operations')
