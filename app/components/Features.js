function Features() {
  return (
    <div class="col-sm-4 shadow-lg p-3 mb-5 bg-white rounded text-center">
      <h4 className="">
        Age <span className="badge badge-info ml-2">35</span>
      </h4>
      <h4 className="pt-3">
        Experience <span className="badge badge-info ml-2">+5 years</span>
      </h4>
      <h4 className="my-3">Languages</h4>
      <span className="badge badge-info  p-3 mr-1">English</span>
      <span className="badge badge-info  p-3 mr-1">French</span>
      <span className="badge badge-info  p-3">Dutch</span>
      <style jsx>{`
        span:hover {
          background-color: red;
          color: white;
        }
      `}</style>
    </div>
  );
}
export default Features;
