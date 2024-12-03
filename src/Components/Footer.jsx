import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

const Footercom = () => {
  return (
    <Footer container className="border border-t-8  dark:bg-black">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="#"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAADo6OgjIyOZmZmUlJTa2tqcnJxUVFTFxcXz8/MZGRlwcHBfX1/AwMD29vaMjIxZWVmnp6doaGimpqbOzs6tra2Dg4PU1NS6urrg4OB3d3c8PDxPT081NTWzs7NISEgmJiY6Ojp+fn4SEhItLS0dHR0NDQ1ERERZ4alLAAAKY0lEQVR4nO2d63qqOhCGE1u1WhU8oWKtdVt13f8VbgKTYXJAUKtAnnx/llAWzeuEGTKZpIx5eXl5eXl5eXl5eXl5eXk9V5O6G/Bszbt1t+DJGvH3upvwXG2544RH7jjhijtOmAK6TJgBOkwYcscJJaCzhF3uOGEO6CghAXST8J07TtjnjhOqgA4SIuDnxU1CBDyt3bThQgKehx0nCRHws8OcJETAtw5zknAmAQ8JoIuEET6DCeAycI9wLwF/E8Aed8+Ge2rBHnePEAEPGaBzhBvqRWPuHuGExEFAc4twQJ1M59c9QgQUTqZz5s4RImD6JnPgzhEqFhxKQIcIlxLpIgBP3DnCNXUyw2/uHCFa8KwBukK4poDBF3eOsEe7qAroBmGMOGI8+I87R4gWFK9qgQboAiECps/gD3eOULEgMwDbT6g+gybgR+sJzxRwZwBO25+JeoMuGjMb4Ji5QngWgB9WQEcIl8wGOE2vcIOwx9jY4mRSuUI4KrCgO4RfOuA4+/mk9TlvSai/rAHgsv0Rv4AQuujSgXcaey8FJ+NEzttKCF00fWV1khAAs1dWFwkloCM5b0n4n/4Mxp/cUULwojBr4RChTCBCF+1cuEYY1tvO+6URSkAcNiIhb+uiGZVQdtEDNwnbiqgQgpMZEkBCyAf1NvVOUULoosM3bidsJyIhtAIqhK1EzAkl4IkXE7YRURIe5DP4za8Rtgyxx5AwAAsGmgUNwlYhLlaM5GlSmYAGYYsQIy6WhSqEgd5FOZ9LwjH+bFlrs6sr4gZhYCRrEkBJuB1+tgtR1K/phHquJgWUhCMWX9qEmBboaYR2wJyQzOI0HzGrQFQJzXmnFJAQtggRSiwVQjOpnwFSwnyyka9rbH65ZA2pGPJJwnkRoEKYF200GhFrSMVwqDDnLQFVwlYgIuBeHBXlvBFQI2xBR0XAKD0sIMwBdUJixZ5x8yYIAWfZsb2XEkCDMK8QayQiAi7ghJWQApqEeZ1mAxEREHODNkIF0ELYYCsiYL4Vi5kR1gBthI21IraL5D5NQg3QSkgQ4+e3u7rkyuUjOWcQ6oB2wnzdwqVJiH0Lg57zNgALCPMe/9sgxIzwSzmnEZqARYQ5YoM6akb4oZxTCS2AhYRkDdiT2nu7SgltgMWEuFDx8ymtvUdlhFbAK4RysWlrCHXA/edQ/HOFkE1bRagDRhAJrhGOW0T4ZgHk6QjJEcJAB5BeZJAMly4uEOqX4npuMYxMp7wdI8wB02GIWKLgFuGCU4npjblbhCpgFkaO1mDZUkIdkPNdctY65dROwhwwxCHV19B+x1YSEkD5zsKzpcEWtZGwTwHTjUtB1uxoCwk1QNwXktsnY9pHaADSTds25h1bR2gBJANd3jfu2CTCYF9O+G4DpHm1lX7XJhHuuqWEBYCM9XB6e6vdtUGEU/F6eZ2wWwRIaxXH6g+aQzjl1wnjKxYUyiulvgJ6vjGEYgb7GmF01YJ4i1QHGvubQpi24wrhrByQxH6aAW4IYdaMYsIF2S34Sjm3LfY3gxAWFhYSVgSkTyrWQzeCUK6cLIgWIoxXA6Sxf6bcvF5CCXgY2gn7tPuVrThY6lc2gFCWyYj9EqyEtwDSQows9tdPKAF/UxdvJTzeAJjEfixATbMatee8sdApi2E2wtsAk9iPE/67QD7B9RGOVUAb4a2AjOxLcB5CHK2NUFoQ56FNwjsAWb7sW8T+qEZCbIg2gCeE23sASXT5XacT+jUR4mh2rZ3KCUf3AdKR8kSEkN+/avNt6hqAOuHdgHQOP0p3ca1FQEjzRyrhA4A09ievDPZM49OVEU7pKYXwIUA67j+WX/wclRDOHwOk43779P/zdZ1w/ChgEvuxJFV/D3yRCgnFNMsfADIy7v8umNZ4rgoJw78C1GL/y1VEuCXzLXbAeDHL1A9Y0IfPCysDxv5LDVWYBYRzurLCbkEsO+RDNsTP9nXOuEF9DUva7ITTcsCbCEns3/81QZmshB90y7KiZ/AmQjX2v1QWwu6/Cha8lZDF59I7PkcWwn1QBfBWQhL7rfUaT5OFsEoXZbcTkti/+5u2V5ONsBLg7YQkwP4Lrl32t7IQVgO8hzAfS59eN9AwCSsCJoRvmVJC+blk348aYr9B+FMRkAUo/eCa8lK4V61p0wkrA96rPPa/aJuXUHFuZAPkckCrDct/Yx77F+UX/4HipRD0mOAWC97jabJf+Vb9l9yn3oAqJYSPN3XRuwlJzv+4HNj1mB/KZ8kKVeXLvZ+QBf/ZfumtDShWt+z21e7/AKFto1dVj/2J9lLCal/gQ4RkoqAGwoo95DHCkmflqYRVH4EHCS01xn9GeP3bq/yMP0pIbvBAK+x37l7RrPz/Gw28k5Ctw8JmNGJbu3gWZVoELFjA51lzllF6eXl5eXl5eXl5eXnVrc5yMlnXVMP1sILxaBWutmMc5kXzbRhu5xFe0TtCtvM7RMj17tjtz9Lx4uw93I5/ToPkP462x5UY44bhcTsazUWNwmqbnFiNLEsUXyY5WMeMLBSwywV3gfLnkORZM+UyIMsuQGLmF9ZFRcbvfZ0kIdowVPImeSFeJpgGNHNbS5NaFH1B9XedNgygOdgBgTDLffX0VmfLF0gRcU4Y6adODPevrTULA83BCjTobGmJyPCitxo2zDL3ht6TlTOgN4Zzd7VuTQutwVkyMEU6EWZNxYdya5oDWPXj61PYXKbiPk9n+GICLCSrdcPPbK/qbzwGUwjfgBN/H5u4t8Gqtw4L4s4wwA294T/C1VBZEnRiYTgoV601IZd1uH94PJG9LjcheEL5oEmHCoRyOnmJJiaayy+lRmW+4AePYYX2JnezOHMrvSUcajYEr6QWP48aQAi+YAvpaLmrxwStuTOuhdgJhLLYGba8Pu8Hk8kmWvSPIkSA062lklbK3M061QCDHvH0+7wHM7Sxtjd0LnEZzKm9sF7IVMHU5dLWOjATFBsCoSxaMwiFp1k1mhB6GLkWmLrKUSGh6Mwr4x6v1y2EHRthYS8V7qXZhGHeUBD4WXCumi81CIV7aQIheJrFJC1DmUzgeIC12qTMB3w/+B6NEB7SaeJKE2e6WazEw9cEwiwC5Avp3pFCun90E/IdB3w/EMp1I7BjuRrxjw0gzMY3F8SAGCGC2UkzEvzZPPn+E6uE1neaJhAeFLvg0yeCmRzT/qRDAxw7yOJ7MNoPHEKFnlqba3qr14vbCRfkZ8nQ4yMvQj3JK4FQ7j8sv4Hv0Wq12s4/vt5CfHKjfRT1u+F2NK5hRRu0Cz0mfOtpVLcWT+BYDzyrHJaYmY0uM/8k9M9L4YSMMf4IW8esdSr56gngP8Bh37h0z8w/APL69WxGngbaBEOkld5C4kjgwZNu2MhECWsbhNpmRC+QQQgDXfm8aNkXusRHPnhwaNq7YyE0Ns16uuSbCBLCCAkXgXRI1umojIIkPAQaw9xiKbfxxvSaMmFFnZ5Q/mo2jNNjMhoINuF0txuHE32EEK8T9SR10MkVx731ZJmeTD72ksuWg80+caiLWkeKXl5eXl5eXl5eXl5eXl5N1/9s+oWGd18zmgAAAABJRU5ErkJggg=="
              alt="Hotel Royal Logo"
              name="Hotel ROYAL"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Hotels</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
                <Footer.Link href="#">React</Footer.Link>
                <Footer.Link href="#">Redux</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Balakrishnan-10">
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
                <Footer.Link href="#">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between font-bold">
          <Footer.Copyright
            href="#"
            by="Balakrishnan™"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/Balakrishnan-10"
              icon={BsGithub}
            />
            <Footer.Icon href="#" icon={BsDribbble} />
            <Footer.Icon href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footercom;
