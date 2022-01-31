import RegisterService from '../services/register.service';
import { Post, Route, Body, SuccessResponse, Response, Example } from 'tsoa';
import { WaitLister, SuccessResp, ErrorResp } from '../interface';

@Route('api/register')
export default class RegisterController {
  @SuccessResponse('201', 'Created')
  @Example<SuccessResp>({
    status: 201,
    message: 'Successfully added to the waitlist',
    data: {
      fullName: 'Ridwan Onikoyi',
      email: 'onikoyiridwan@gmail.com',
      type: 'Investors',
      description: null,
      id: '778a100d-9c11-4d78-9de0-f9ba1064975a',
      createdAt: '2022-01-30T22:09:04.055Z',
      updatedAt: '2022-01-30T22:09:04.055Z',
    },
  })
  @Response<ErrorResp>(422, 'Validation Failed', {
    status: 422,
    message: 'Validation error',
    error: ['type must be one of [Investors, Asset listers]'],
  })
  @Response<ErrorResp>(409, 'Email already exists', {
    status: 409,
    message: 'Email already exists',
    error: {
      email: 'Email already exists',
    },
  })
  @Post('/')
  static async signUp(
    @Body() requestBody: WaitLister,
  ): Promise<SuccessResp | ErrorResp> {
    return RegisterService.signUp(requestBody);
  }
}
