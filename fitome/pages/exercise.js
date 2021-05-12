import UploadImageForm from '../components/uploadImageForm.js';
import { postExercise } from '../redux/trainer'

const Exercise = () => {

  const handleChange = () => {
    
  }
  
  const handleSubmit = () => {
    
  }
  
  return (
    <div>
      <form>
          <input placeHolder="Exercise name" type="text" name="title" onChange={handleChange}/>
          <input placeHolder="Description" type="text" name="description" onChange={handleChange}/>
          <input placeHolder="Muscle Group" type="text" name="muscle_group" onChange={handleChange}/>
          <input placeHolder="Benefits" type="text" name="benefits" onChange={handleChange}/>
          <input type="submit" value="Create" onClick={handleSubmit}/>
          <UploadImageForm></UploadImageForm>
      </form>
    </div>
  )
}

export default Exercise
/*
const Exercise = sequelize.define('exercise', {
  trainer_uid: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  media: {
    type: DataTypes.STRING,
  },
  muscle_group: {
    type: DataTypes.STRING,
    allowNull: false
  },
  benefits: {
    type: DataTypes.STRING,
  },
}); */