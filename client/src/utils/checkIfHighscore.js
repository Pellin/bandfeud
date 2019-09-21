const checkIfHighscore = async score => {
  const reply = await fetch(`/api/checkhighscore?score=${score}`);
  if (reply.status === 202) {
    return true;
  }

  return false;
};

export default checkIfHighscore;
