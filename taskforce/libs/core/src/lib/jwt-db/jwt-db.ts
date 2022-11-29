import * as jose from 'jose';
import * as crypto from 'crypto';

const secret = 'salt';
const expirationTime = '10m'; // minute

const healthTimeToDB = 10 * 60000;
const timeInterval = 60 * 1000;

export class JWT {
  private isInitRecordToDB = false;
  private jwtdb = new Map();

  private async cleaningDB() {
    for (const item of this.jwtdb) {
      const [token, timeDelete] = item;
      if (!(Date.now() - timeDelete >= healthTimeToDB)) {
        continue;
      }

      this.jwtdb.delete(token);
    }
  }

  public async pushItem(token: string) {
    if (!this.isInitRecordToDB) {
      setInterval(this.cleaningDB, timeInterval);

      this.isInitRecordToDB = true;
    }

    this.jwtdb.set(token, Date.now());
  }

  public async createJWT(algoritm: string, jwtSecret = secret, payload: object) {
    return new jose.SignJWT({...payload})
          .setProtectedHeader({ alg: algoritm })
          .setIssuedAt()
          .setExpirationTime(expirationTime)
          .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
  }
}
