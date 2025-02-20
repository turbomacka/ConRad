const express = require('express');
const router = express.Router();
const groupsModel = require('../models/groups');
const assignmentsModel = require('../models/assignments');
const concepts = require('../static/concepts');

const FIFTEEN_MINUTES = 15 * 60 * 1000;

router.post('/join', async (req, res) => {
  try {
    const { groupNumber } = req.body;
    if (!groupNumber) {
      return res.status(400).json({ error: 'groupNumber is required' });
    }

    // Hämta eller skapa grupp
    let group = groupsModel.getGroup(groupNumber);
    if (!group) {
      group = groupsModel.createGroup(groupNumber);
    } else {
      // Kontrollera om 15 minuter har passerat sedan start_time
      const now = new Date();
      const startTime = new Date(group.start_time);
      if (now - startTime >= FIFTEEN_MINUTES) {
        groupsModel.resetGroup(groupNumber);
        group = groupsModel.getGroup(groupNumber);
      }
    }

    // Kontrollera om gruppen är full (max 5 medlemmar)
    if (group.member_count >= 5) {
      return res.status(400).json({ error: 'Gruppen är full (max 5 medlemmar).' });
    }

    // Hämta redan tilldelade begrepp i gruppen
    const assignments = assignmentsModel.getAssignedConcepts(groupNumber);
    const assignedConcepts = {
      A: assignments.map(a => a.concept_a),
      B: assignments.map(a => a.concept_b),
      C: assignments.map(a => a.concept_c),
      D: assignments.map(a => a.concept_d),
    };

    // För varje kategori, välj ett ledigt begrepp
    const newAssignment = {};
    for (let category in concepts) {
      const availableConcepts = concepts[category].filter(concept => !assignedConcepts[category].includes(concept));
      if (availableConcepts.length === 0) {
        return res.status(400).json({ error: `Inga lediga begrepp kvar för kategori ${category}.` });
      }
      const randomIndex = Math.floor(Math.random() * availableConcepts.length);
      newAssignment[`concept_${category.toLowerCase()}`] = availableConcepts[randomIndex];
    }

    // Spara tilldelningen
    const assignmentRecord = assignmentsModel.createAssignment(groupNumber, newAssignment);
    groupsModel.incrementMemberCount(groupNumber);

    res.json({ assignment: assignmentRecord });
  } catch (error) {
    console.error('Error in /join:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
