export const EMAIL_LENGTH = {
  min: 5,
  max: 256,
} as const;

export const SEARCH_REGEX = /^[a-zA-Z0-9 \[!#$%&'’*+\-\/=?^_`{|}~.,\]@]*$/;

export const USER_NAME_REGEX = /^[a-zA-Z0-9 \[!#$%&'’*+\-/=?^_`{|}~.,\]]*$/;

export const USER_NAME_LENGTH = {
  min: 1,
  max: 200,
};

export const PASSWORD_LENGTH = {
  min: 8,
  max: 256,
};

export const PASSWORD_PATTERN = /^[A-Za-z0-9\[\]!#$%&'*+-/=?^_`{|}~.,@]*$/;

export const EMAIL_LOCAL_PART =
  /^(?!-)(?!\.)(?!.*--)(?!.*\.\.)[a-zA-Z0-9!#$%&'*+.\-\/=?^_`{|]*(?<!-)(?<!\.)$/;

export const EMAIL_DOMAIN_PART =
  /^(?!-)(?!\.)(?!.*--)(?!.*\.\.)[a-zA-Z0-9\-.]*(?<!-)(?<!\.)$/;
