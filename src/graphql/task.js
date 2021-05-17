
export const [repo, commit] = [5, 5];
export const TaskVariables = { "queryString": "is:public language:Ruby stars:>8000 created:2012-05-01..2021-05-01", "repo": repo, "commit": commit };
export const TaskQuery =
  `
    query Task($queryString: String!, $repo: Int, $commit: Int) {
      search(query: $queryString, type: REPOSITORY, first: $repo) {
        repo_count: repositoryCount
        results: nodes {
          ... on Repository {
            repository_name: name
    
            defaultBranchRef {
              name
              target {
                ... on Commit {
                  id
                  history(first: 0) {
                    totalCount
                  }
                }
              }
            }
            Star_count: stargazerCount
            commitComments(first: $commit) {
              authors: nodes {
                commit {
                  authors(first: 20) {
                    nodes {
                      name
                    }
                  }
                  commit_hash: oid
                }
              }
            }
          }
        }
      }
    }    
`;

export const TaskSchema = `
{
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }
`;

