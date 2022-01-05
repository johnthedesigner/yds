import Button from './Button.client';

export default function NotFound({country = {isoCode: 'US'}}) {
  return (
    <>
      <div className="py-10 border-b border-gray-200">
        <div className="max-w-3xl text-center mx-4 md:mx-auto">
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
            We&#39;ve lost this page
          </h1>
          <p className="text-lg m-8 text-gray-500">
            We couldn’t find the page you’re looking for. Try checking the URL
            or heading back to the home page.
          </p>
          <Button
            className="w-full md:mx-auto md:w-96"
            url="/"
            label="Take me to the home page"
          />
        </div>
      </div>
    </>
  );
}
