from os import rename

def main():
    with open('notebook.js') as f:
        lines = f.readlines()
        version_line = lines[3]
        version = int(version_line.replace('// Version: ', '').strip())
    
    new_nb_name = 'notebook-{version}.js'.format(version=version)
    rename('notebook.js', new_nb_name)

    print('IMPORTANT: replace line 29 in index.html with:')
    print('./{}'.format(new_nb_name))

if __name__ == '__main__':
    main()
