from rest_framework.exceptions import APIException


class ProfileNotFound(APIException):
    default_code = 404 
    default_detail = "Requested Profile doesn't exists"


class NotYourProfile(APIException):
    default_code = 403
    default_detail = "Requested Profile is not yours"

    