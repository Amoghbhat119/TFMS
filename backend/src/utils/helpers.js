exports.formatSkills = (skills) => {

  if (!skills) return [];

  if (Array.isArray(skills)) return skills;

  return skills.split(",").map(skill => skill.trim());

};



exports.calculatePercentage = (value, total) => {

  if (total === 0) return 0;

  return (value / total) * 100;

};