type TActiveLinkProp = {
  url: string;
  children: React.ReactNode;
};
type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
};
//USER

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email_address: string;
  name?: string;
  avatar?: string;
};
export { TActiveLinkProp, TMenuItem, TCreateUserParams };
