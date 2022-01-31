import { getRepository } from 'typeorm';
import { WaitLister } from '../interface';
import { WaitList } from '../models/waitlist.model';

class RegisterService {
  static async signUp(requestBody: WaitLister) {
    const waitListRepository = getRepository(WaitList);

    // check if user email does not exist
    const existingWaitlist = await waitListRepository.findOne({
      email: requestBody.email,
    });

    if (existingWaitlist) {
      return {
        status: 409,
        message: 'Email already exists',
        error: {
          email: 'Email already exists',
        },
      };
    }

    const waitlist = new WaitList();
    waitlist.fullName = requestBody.fullName;
    waitlist.email = requestBody.email;
    waitlist.type = requestBody.type;

    if (requestBody.description) {
      waitlist.description = requestBody.description;
    }

    const savedWaitList = await waitListRepository.save(waitlist);

    return {
      status: 201,
      message: 'Successfully added to the waitlist',
      data: savedWaitList,
    };
  }
}

export default RegisterService;
