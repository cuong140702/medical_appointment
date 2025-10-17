-- CreateIndex
CREATE INDEX "Appointment_patientId_idx" ON "Appointment"("patientId");

-- CreateIndex
CREATE INDEX "Appointment_doctorId_idx" ON "Appointment"("doctorId");

-- CreateIndex
CREATE INDEX "Appointment_appointmentAt_idx" ON "Appointment"("appointmentAt");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- CreateIndex
CREATE INDEX "DoctorProfile_userId_idx" ON "DoctorProfile"("userId");

-- CreateIndex
CREATE INDEX "DoctorProfile_specialization_idx" ON "DoctorProfile"("specialization");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_payDate_idx" ON "Payment"("payDate");

-- CreateIndex
CREATE INDEX "Payment_paymentMethod_idx" ON "Payment"("paymentMethod");

-- CreateIndex
CREATE INDEX "Review_doctorId_idx" ON "Review"("doctorId");

-- CreateIndex
CREATE INDEX "Review_patientId_idx" ON "Review"("patientId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "Service_doctorId_idx" ON "Service"("doctorId");

-- CreateIndex
CREATE INDEX "Service_price_idx" ON "Service"("price");

-- CreateIndex
CREATE INDEX "User_roleId_idx" ON "User"("roleId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "WorkSchedule_doctorId_idx" ON "WorkSchedule"("doctorId");

-- CreateIndex
CREATE INDEX "WorkSchedule_dayOfWeek_idx" ON "WorkSchedule"("dayOfWeek");
