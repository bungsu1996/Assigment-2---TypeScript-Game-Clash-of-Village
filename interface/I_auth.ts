import express, { Request } from 'express';

interface I_Auth extends Request {
  allUser?: String,
}


export default I_Auth;