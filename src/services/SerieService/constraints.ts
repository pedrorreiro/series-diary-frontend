type ErrorResponseMapParams = {
  errorStatus?: number
  routeName: string
}

export function errorResponseMap(params: ErrorResponseMapParams): string {
  if (!params.errorStatus)
    return 'Não foi possível se conectar ao servidor. Por favor, tente novamente mais tarde.'

  const map: Record<number, string> = {
    401: 'Sua sessão expirou! Por favor, faça login novamente para continuar.',
    404: `A rota '[${params.routeName}]' não foi mapeada corretamente. Por favor, contate o suporte.`,
    428: 'Você não atende aos requisitos mínimos para acessar este recurso. Por favor, contate o suporte.',
    429: 'Você atingiu o limite de requisições para este recurso. Por favor, tente novamente mais tarde.',
    500: 'Ocorreu um erro interno no servidor. Por favor, contate o suporte.'
  }

  return map[params.errorStatus]
}
