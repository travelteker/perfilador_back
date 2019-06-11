
class AuthenticationStore {
/*
    static async authenticate(req, res, next) {
        const payload = await AuthenticationStore.consumeToken(req);
        if (payload.status && payload.status !== 200) {
            return res.status(payload.status).send(payload.message);
        }
        req.user = payload.sub;
        req.role = payload.role;
        next();
    }
    
    static async isAdmin(req, res, next) {
        if (!req.user || req.role !== 'ADMIN') {
            return res.status(401).send('Unauthorized');
        }
        next();
    }
    

      static signJwt(user) {
        let payload = {
          sub: user._id,
          role: user.role,
          iat: moment().unix(),
          exp: moment()
            .add(3, 'days')
            .unix()
        };
        return jwt.sign(payload, config.TOKEN_SECRET);
      }
    
      static decodeJwt(token) {
        let payload = null;
    
        try {
          payload = jwt.decode(token, 'big secret');
        } catch (err) {
          // handle error
        }
        return payload;
      }
    
      static bearer(token) {
        let payload = this.decodeJwt(token);
        return payload;
      }
    
      static async consumeToken(req) {
        let result = {};
        if (!req.headers.authorization) {
          result.status = 401;
          result.message = 'Please make sure your request has an authorization header';
          return result;
        }
        let token = req.headers.authorization.split(' ')[1];
        let type = req.headers.authorization.split(' ')[0];
        let payload;
        switch (type) {
          case 'Bearer':
            payload = AuthenticationStore.bearer(token);
            break;
          default:
            result.status = 401;
            result.message = 'Invalid token type.  Must be type Bearer or Basic';
            return result;
        }
        if (!payload || !payload.sub) {
          result.status = 401;
          result.message = 'Authorization Denied.';
          return result;
        }
    
        if (payload.exp <= moment().unix()) {
          result.status = 401;
          result.message = 'Token has expired';
          return result;
        }
        return payload;
      }
      */
}