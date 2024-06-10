import { NextApiRequest, NextApiResponse } from 'next';
import { apiStatusCodes } from '@/constant';
import { sendAPIResponse } from '@/utils';
import { connectDB } from '@/middlewares';
import {
  createUserInDB,
  getUserByEmailFromDB,
  getUserByIdFromDB,
} from '@/database/query/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(res);

  const { method } = req;
  switch (method) {
    case 'GET':
      return handleGetUser(req, res);
    case 'POST':
      return handleCreateUser(req, res);
  }
};

const handleGetUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, userId } = req.query as {
      email: string;
      userId: string;
    };

    if (email) {
      const { data, error } = await getUserByEmailFromDB(email);

      if (error) {
        return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
          sendAPIResponse({
            status: false,
            error,
            message: 'error while fetching user',
          })
        );
      }

      return res
        .status(apiStatusCodes.OKAY)
        .json(sendAPIResponse({ status: true, data }));
    }

    if (userId) {
      const { data, error } = await getUserByIdFromDB(userId);

      if (error) {
        return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
          sendAPIResponse({
            status: false,
            error,
            message: 'Error while fetching user',
          })
        );
      }

      return res
        .status(apiStatusCodes.OKAY)
        .json(sendAPIResponse({ status: true, data }));
    }

    return res.status(apiStatusCodes.BAD_REQUEST).json(
      sendAPIResponse({
        status: false,
        message: 'Please provide Email or User id',
        error: 'Please provide Email or User id',
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        error,
        message: 'error while fetching user',
      })
    );
  }
};

const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, name } = JSON.parse(req.body) as {
      email: string;
      name: string;
    };

    if (!email || !name) {
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          error: 'Please provide email and name',
          message: 'Error while creating user',
        })
      );
    }

    const { data } = await getUserByEmailFromDB(email);

    if (!data) {
      const { data, error } = await createUserInDB({ name, email });

      if (error) {
        return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
          sendAPIResponse({
            status: false,
            error,
            message: 'Error while creating user',
          })
        );
      }

      return res
        .status(apiStatusCodes.OKAY)
        .json(sendAPIResponse({ status: true, data }));
    } else {
      return res
        .status(apiStatusCodes.OKAY)
        .json(sendAPIResponse({ status: true, data }));
    }
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        error,
        message: 'Error while creating user',
      })
    );
  }
};

export default handler;