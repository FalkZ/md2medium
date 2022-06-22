import { Octokit } from 'octokit'


export const getUsername = async (auth, fileName) => {
    const octokit = new Octokit({
        auth
      })
      
    const response = await octokit.request('GET /user', {})
    
    return response.data.login
}

export const createGist = async (auth, fileName) => {
    const octokit = new Octokit({
        auth
      })
      
      const response = await octokit.request('POST /gists', {
        description: 'Created for Medium',
        'public': false,
        files: {
            [fileName]: { content: "placeholder" }
        }
      })

      return  response.data.id
}

export const updateGist =  async (auth, id, title, files) => {
    const octokit = new Octokit({
        auth
      })

await octokit.request('PATCH /gists/{gist_id}', {
  gist_id: id,
  description: title,
  files
  })
}

export const getGists =  async (auth) => {
    const octokit = new Octokit({
        auth
      })

    const response = await octokit.request('GET /gists', {})
    return response.data
}

export const getOrCreateGist = async (auth, filename) => {
    const result = (await getGists(auth)).find(({files})=> files[filename])
    if(result) return result.id

    return await createGist(auth, filename)
}