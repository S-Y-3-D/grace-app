
export default function apiRequest(prompt){

    const options={
      method: 'POST',
      url: 'https://api.cohere.ai/generate',
      headers: {
        accept: 'application/json',
        'Cohere-Version': '2022-12-06',
        'content-type': 'application/json',
        authorization: 'Bearer BTLdlVK52xTi1DjvelK5C5mYzPqcoeildQ2FlMtA'
      },
      data: {
          model:'command-xlarge-nightly',
          prompt:prompt,
          max_tokens:300,
          temperature:2,
          k:0,
          p:0.75,
          frequency_penalty:0,
          presence_penalty:0,
          stop_sequences:["##"],
          return_likelihoods:'NONE'
      }
    }
    return options
  }
