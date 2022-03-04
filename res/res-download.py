import wget
import pathlib
#url = "https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/champions/"
url = "https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/items/"
#url = "https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/summonability/"
#url = "https://wegame.gtimg.com/app/lol/score_souces/division/"

path = str(pathlib.Path(__file__).parent.absolute())+"/"

#i = 515
i = 1000
#z = 0
while (i < 80000):
    print(i)
    try:
        wget.download(url+str(i)+'.png', path+str(i)+'.png')
        '''
        while (z < 4):
            wget.download(url+str(i)+'_'+str(z)+'.png', 'C:/LOLIMG/'+str(i)+'_'+str(z)+'.png')
            z += 1
        '''
    except:
        print("error")
   
    i += 1