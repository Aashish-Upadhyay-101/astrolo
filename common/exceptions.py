from rest_framework.exceptions import APIException
 

class UserNotFound(APIException):
    status_code = 404
    default_detail = "Requested user doesn't exists"


class ProfileNotFound(APIException):
    status_code = 404 
    default_detail = "Requested Profile doesn't exists"


class NotYourProfile(APIException):
    status_code = 403
    default_detail = "Requested Profile is not yours"
    
    
class VerificationCodeExpires(APIException):
    status_code = 404
    default_detail = "Verification Code is expired, please request a new one."