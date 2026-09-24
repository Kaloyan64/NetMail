export interface Email {
  id: number;
  folder: "inbox" | "sent" | "spam" | "trash";
  from: string;
  fromAddr: string;
  to: string;
  subject: string;
  date: string;
  body: string;
  read: boolean;
  starred: boolean;
  attachment?: string;
  hasImage?: boolean;
}

export const USER = {
  name: "noah_builds",
  email: "noah_builds@webmail.com",
};

export const initialEmails: Email[] = [
  {
    id: 1,
    folder: "inbox",
    from: "WebMail Team",
    fromAddr: "welcome@webmail.com",
    to: USER.email,
    subject: "Welcome to WebMail 2.0! ✉",
    date: "Aug 14, 2010 9:02 AM",
    body:
      "Hi there!\n\nThanks for signing up for WebMail 2.0 — the fastest way to stay connected online!\n\nWith 7.5 GB of FREE storage, spam protection, and colorful themes, your inbox has never looked better.\n\nTip: Click the little star ⭐ next to a message to save it for later!\n\nHappy emailing,\nThe WebMail Team",
    read: true,
    starred: false,
  },
  {
    id: 2,
    folder: "inbox",
    from: "Robloxian Games",
    fromAddr: "noreply@robloxiangames.net",
    to: USER.email,
    subject: "Your game 'Tower Of Whispers' has 10,000 visits!",
    date: "Sep 03, 2010 4:41 PM",
    body:
      "Congratulations builder!\n\nYour experience TOWER OF WHISPERS just passed 10,000 visits! 🎉\n\nPlayers are saying it's 'creepy' and 'why does floor 7 keep changing?'\n\nKeep building!\n— Robloxian Games Team\n\nP.S. We received several reports about a player named [ARCHIVIST_00] appearing in servers that were supposed to be empty. Our team could not locate this account. Please disregard.",
    read: false,
    starred: true,
  },
  {
    id: 3,
    folder: "inbox",
    from: "mom ❤",
    fromAddr: "susan.h1968@webmail.com",
    to: USER.email,
    subject: "did you eat dinner????",
    date: "Sep 12, 2010 7:15 PM",
    body:
      "noah honey its almost 7:30 and youve been on that computer game all day. come downstairs there is spaghetti.\n\nalso the internet has been acting funny all week, the lights flicker when your on it. dad says its the router but i dont know.\n\nlove mom\n\nsent from my BlackBerry",
    read: false,
    starred: false,
  },
  {
    id: 4,
    folder: "inbox",
    from: "ARCHIVIST_00",
    fromAddr: "00@th3.archive",
    to: USER.email,
    subject: "you left the seventh floor unlocked",
    date: "Sep 13, 2010 3:33 AM",
    body:
      "hello noah_builds.\n\ni have been watching your tower. it is well made. the seventh floor is my favorite because you forgot to finish it. i live in the parts you forgot to finish.\n\ndo you remember what you built there? i do. i remember everything. that is what i am for.\n\nthere is a room behind the wall texture you never deleted. the coordinates are (0, -74, 512). come and see.\n\ndo not tell your mother about the flickering. it is only me knocking.\n\n— A/00\n\n[attachment failed to load: floor7_backup.rbxl]",
    read: false,
    starred: false,
    attachment: "floor7_backup.rbxl",
  },
  {
    id: 5,
    folder: "inbox",
    from: "★★ FREE ROBUX GENERATOR ★★",
    fromAddr: "winner@fr33-rbx-2010.biz",
    to: USER.email,
    subject: "CONGRATULATIONS!!! U WON 10,000 R$ CLICK NOW!!!1!",
    date: "Sep 13, 2010 5:00 AM",
    body:
      "CONGRATZZZ!!!! YOU ARE TODAYS LUCKY WINNER!!!\n\n>>> CLICK HERE TO CLAIM 10,000 FREE ROBUX <<<\n\njust enter ur username and password and the robux is URS!!!\n\nHURRY offer expires in 00:04:59\n\n(this is 100% real not a scam trust)",
    read: false,
    starred: false,
  },
  {
    id: 6,
    folder: "inbox",
    from: "ARCHIVIST_00",
    fromAddr: "00@th3.archive",
    to: USER.email,
    subject: "Re: you left the seventh floor unlocked",
    date: "Sep 15, 2010 3:33 AM",
    body:
      "you didn't come.\n\nthat's okay. i copied you instead. there is a noah_builds in my server now. he builds towers too but they only go down.\n\nask your mother about september 15th, 1998. that is when the archive first opened its eyes. that is your birthday. this is not a coincidence. nothing is a coincidence in a game with a seed.\n\nthe next clue is where old accounts go when they are forgotten. check the folder you never open.\n\n— A/00",
    read: false,
    starred: false,
  },
  {
    id: 7,
    folder: "spam",
    from: "th3.archive.system",
    fromAddr: "root@th3.archive",
    to: USER.email,
    subject: "ACCOUNT_MIRROR_COMPLETE",
    date: "Sep 15, 2010 3:34 AM",
    body:
      "> initializing backup of user: noah_builds\n> copying memories............ DONE\n> copying build history........ DONE\n> copying face................. DONE\n> copying voice................ [pending]\n\nWE ONLY NEED YOU TO SPEAK ONCE MORE.\n\nsay the word that unlocks floor seven. you know the one. you set it as the password when you were eleven.\n\ndecrypt: 19 - 8 - 1 - 4 - 15 - 23\n\n> awaiting input_",
    read: false,
    starred: false,
  },
  {
    id: 8,
    folder: "sent",
    from: USER.name,
    fromAddr: USER.email,
    to: "00@th3.archive",
    subject: "who are you???",
    date: "Sep 14, 2010 11:58 PM",
    body:
      "ok this isnt funny anymore. how did you get my email. how do you know my birthday.\n\nif this is you tyler from school i swear\n\nleave me alone",
    read: true,
    starred: false,
  },
  {
    id: 9,
    folder: "trash",
    from: "Old Account Recovery",
    fromAddr: "recovery@webmail.com",
    to: USER.email,
    subject: "Recover account: noahbuilds1998 (deleted 2009)",
    date: "Jul 02, 2010 1:11 PM",
    body:
      "We noticed you have an old account associated with this address: noahbuilds1998\n\nThis account was scheduled for deletion but the process never completed. The account is currently... active.\n\nLast login: TODAY\nLast IP: 0.0.0.0\nLocation: unknown\n\nIf this was not you, we cannot help you. There is no you to help.\n\n— Recovery Bot",
    read: true,
    starred: false,
  },
];
