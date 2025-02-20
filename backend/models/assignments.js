const { loadData, saveData } = require('./dataStore');

function createAssignment(groupNumber, assignment) {
  const data = loadData();
  const group = data.groups[groupNumber];
  if (!group) {
    throw new Error("Group not found");
  }
  const now = new Date().toISOString();
  const newAssignment = { ...assignment, join_time: now };
  group.assignments.push(newAssignment);
  saveData(data);
  return newAssignment;
}

function getAssignedConcepts(groupNumber) {
  const data = loadData();
  const group = data.groups[groupNumber];
  if (!group) {
    return [];
  }
  return group.assignments;
}

module.exports = {
  createAssignment,
  getAssignedConcepts,
};
