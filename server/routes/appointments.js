import express from 'express';
import { getDB, saveDB } from '../data/store.js';

const router = express.Router();

// GET /api/appointments - list appointments
router.get('/', (req, res) => {
  try {
    const db = getDB();
    res.json({
      success: true,
      total: db.appointments.length,
      data: db.appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/appointments - book a bridal salon appointment
router.post('/', (req, res) => {
  try {
    const db = getDB();
    const { name, email, phone, service, appointmentDate, timeSlot, weddingDate, stylist, notes, location } = req.body;

    if (!name || !email || !appointmentDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, appointment date, and time slot are required'
      });
    }

    const newAppointment = {
      id: `apt-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      service: service || 'Signature Bridal Gown Consultation',
      appointmentDate,
      timeSlot,
      weddingDate: weddingDate || '',
      stylist: stylist || 'Chloe Laurent (Master Bridal Stylist)',
      status: 'Confirmed',
      location: location || 'VELORA Atelier Flagship, New York',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    db.appointments.unshift(newAppointment);
    saveDB();

    res.status(201).json({
      success: true,
      message: 'Bridal consultation scheduled successfully',
      data: newAppointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/appointments/:id/cancel - cancel an appointment
router.put('/:id/cancel', (req, res) => {
  try {
    const db = getDB();
    const apt = db.appointments.find(a => a.id === req.params.id);
    if (!apt) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    apt.status = 'Cancelled';
    apt.updatedAt = new Date().toISOString();
    saveDB();

    res.json({
      success: true,
      message: 'Appointment cancelled',
      data: apt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
