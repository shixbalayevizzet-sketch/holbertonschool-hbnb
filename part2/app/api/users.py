from flask_restx import Resource, Namespace
from app.services.facade import facade

api = Namespace('users', description='User operations')

@api.route('/')
class UserList(Resource):
    def post(self):
        # Məlumatı al və facade-ə göndər
        data = api.payload
        return facade.create_user(data), 201
