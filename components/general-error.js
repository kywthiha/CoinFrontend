export default function GeneralError({ error }) {
  if (error) {
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        return (
          Object.keys(error.response.data.errors).length > 0 && (
            <div className="mb-4">
              <ul className="mt-3 list-disc list-inside text-sm text-red">
                {Object.keys(error.response.data.errors).map(function (
                  key,
                  index
                ) {
                  return <li key={index}>{error.response.data.errors[key]}</li>;
                })}
              </ul>
            </div>
          )
        );
      }
      if (error.response.data.message) {
        return (
          <div className="mb-4">
            <div className="mt-3 list-disc list-inside text-sm text-red">
              {error.response.data.message}
            </div>
          </div>
        );
      }
    }

    return (
      <div className="mb-4">
        <div className="mt-3 list-disc list-inside text-sm text-red">
          {error.message}
        </div>
      </div>
    );
  }

  return <></>;
}
