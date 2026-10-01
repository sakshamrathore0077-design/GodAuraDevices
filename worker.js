export default {
  async fetch(request) {
    return new Response("GAD-PO backend is working!", {
      headers: {
        "Access-Control-Allow-Origin": "https://godaura.org",
        "Content-Type": "text/plain"
      }
    });
  }
};
