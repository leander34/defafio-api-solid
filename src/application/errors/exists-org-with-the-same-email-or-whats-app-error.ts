export class ExistsOrgWithTheSameEmailOrWhatsAppError extends Error {
  constructor() {
    super('Already exists a org with the same email or whatsApp phone.')
  }
}
