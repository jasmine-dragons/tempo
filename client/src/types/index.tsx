export type Player = {
  name: string;
  uuid: string;
  isLeader: boolean;
};

export type GameSession = {
  createdAt: string;
  gameLeader: string;
  sessionId: string;
  updatedAt: string;
  users: string[];
  submissions: {
    blob: {
      type: string;
      data: ArrayBuffer;
    };
    user: string;
  }[];
  _id: string[];
};
