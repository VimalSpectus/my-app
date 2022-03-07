import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import { Audio } from 'react-loader-spinner'


const Loader = () => {
  const [data, setData] = React.useState<type[] | null>();
  const [pageNum, setPageNum] = React.useState<any | null>(0);
  const [loading, setLoading] = React.useState(true);

  interface type {
    title: string ,
    author: string,
    created_at: Date | string 
  }

  React.useEffect(() => {

    ApiCall(pageNum);

    setTimeout(() => {
      setPageNum(pageNum + 1)
    }, 10000);

  }, [pageNum])

  const ApiCall = (page: any) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    setLoading(true);
    fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + page
    )
      .then(response => response.json())
      .then((result) => {
        console.log(result.hits);
          // setData(result.hits);
          const tmpHits = result.hits.map((hit:any) => {
            return {
              title: hit.title,
              author: hit.author,
              created_at: hit.created_at
            };
          });
          console.log(tmpHits);
          setData(tmpHits);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  }
  console.log(data);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead data-testid='custom-element'>
            <TableRow>
              <TableCell align="center">title</TableCell>
              <TableCell align="center">author</TableCell>
              <TableCell align="center">created_at</TableCell>
            </TableRow>
          </TableHead>
          {
            loading === true ? (
              <Audio color="#00BFFF" height={80} width={80} />)
              : (

                <TableBody >
                  { data ? data.map((item:type)=>{
                      return(
                        <TableRow data-testid='show-element'>
                        <TableCell align="center">{item.title}</TableCell>
                        <TableCell align="center">{item.author}</TableCell>
                        <TableCell align="center">
                        {moment(item.created_at).format('DD MM YYYY')}
                        </TableCell>
                        </TableRow>
                      )
                    }) : null
                  } 
                </TableBody>)}


        </Table>
      </TableContainer>
    </div>
  );
}

export default Loader