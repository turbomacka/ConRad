const { loadData, saveData } = require('./dataStore');

function getGroup(groupNumber) {
  const data = loadData();
  return data.groups[groupNumber];
}

function createGroup(groupNumber) {
  const data = loadData();
  const now = new Date().toISOString();
  const newGroup = {
    group_number: groupNumber,
    start_time: now,
    member_count: 0,
    assignments: []
  };
  data.groups[groupNumber] = newGroup;
  saveData(data);
  return newGroup;
}

function resetGroup(groupNumber) {
  const data = loadData();
  const group = data.groups[groupNumber];
  if (group) {
    group.start_time = new Date().toISOString();
    group.member_count = 0;
    group.assignments = [];
    saveData(data);
  }
}

function incrementMemberCount(groupNumber) {
  const data = loadData();
  const group = data.groups[groupNumber];
  if (group) {
    group.member_count++;
    saveData(data);
  }
}

module.exports = {
  getGroup,
  createGroup,
  resetGroup,
  incrementMemberCount,
};
