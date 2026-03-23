/**
 * Utility to mask sensitive information (like connection strings) from logs.
 */

export function maskSensitiveData(message: any): any {
  if (typeof message !== 'string') {
    if (message instanceof Error) {
        let msg = message.message.replace(/([a-zA-Z0-9]+:\/\/)[^:]+:([^@]+)@/g, "$1***:***@");
        msg = msg.replace(/(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9._-]+)/g, "[JWT MASKED]");
        message.message = msg;
        if (message.stack) {
            message.stack = message.stack.replace(/([a-zA-Z0-9]+:\/\/)[^:]+:([^@]+)@/g, "$1***:***@");
        }
        return message;
    }
    return message;
  }
  
  // Mask various connection string formats
  let sanitized = message.replace(/([a-zA-Z0-9]+:\/\/)[^:]+:([^@]+)@/g, "$1***:***@");
  // Mask JWTs if they appear
  sanitized = sanitized.replace(/(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9._-]+)/g, "[JWT MASKED]");
  
  return sanitized;
}

export const logger = {
  error: (message: string, ...args: any[]) => {
    console.error(maskSensitiveData(message), ...args.map(maskSensitiveData));
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(maskSensitiveData(message), ...args.map(maskSensitiveData));
  },
  info: (message: string, ...args: any[]) => {
    console.info(maskSensitiveData(message), ...args.map(maskSensitiveData));
  },
  log: (message: string, ...args: any[]) => {
    console.log(maskSensitiveData(message), ...args.map(maskSensitiveData));
  }
};

export default logger;
