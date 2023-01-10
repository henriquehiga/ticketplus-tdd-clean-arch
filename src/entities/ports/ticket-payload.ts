export interface TicketPayload {
  nome: string;
  documento: string;
  validade: string | null;
  usado: boolean | null;
}
