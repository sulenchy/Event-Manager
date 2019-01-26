import models from '../models';


const { Centers } = models;

async function findCenterById (id, userId) {
    let center;
    try{
        center = await Centers
        .find({
          where: {
            id,
            userId,
          },
        })
      }
      catch(err){
        next(err);
      }
      finally{
        if(center){
            return center;
        }
        return false;
      }
      
}

export default findCenterById;