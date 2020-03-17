import { ASTNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/src/types'
import { print } from 'graphql/language/printer'

const { HASURA_GRAPHQL_ENDPOINT, HASURA_GRAPHQL_ADMIN_SECRET } = process.env

/**
 * To take advantage of syntax highlighting and auto-formatting
 * for GraphQL template literal tags (`gql`) in `src/utils/queries.ts`,
 * you need to `print()` queries before passing them to `graphql-request`.

 * https://github.com/prisma-labs/graphql-request/issues/10
 */
export function request(query: ASTNode, variables?: Variables): Promise<unknown> {
  const request = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT as string, {
    headers: { 'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET as string }
  })

  return request.request(print(query), variables)
}