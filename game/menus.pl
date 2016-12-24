
write_space:- write('    ').

menu_ascii_art:-
	write_space, write('  _   _  ____  _____  ______  _____ '), nl,
	write_space, write(' | '\' | |/ __ '\'|  __ '\'|  ____|/ ____|'), nl,
	write_space, write(' |  '\'| | |  | | |  | | |__  | (___  '), nl,
	write_space, write(' | . ` | |  | | |  | |  __|  '\'___ '\' '), nl,
	write_space, write(' | |'\'  | |__| | |__| | |____ ____) |'), nl,
	write_space, write(' |_| '\'_|'\'____/|_____/|______|_____/ '), nl,
	write_space, write('                                    '), nl .
	
intro_menu:-
	menu_ascii_art,
	write_space, write('   DANIEL GARRIDO     NUNO FREITAS'),nl,
	nl,
	write_space, write('              PRESS ENTER              '), nl,
	get_char(_),
	text_menu.
	
clear_console(0):- nl.
clear_console(X):- nl, X1 is X - 1, clear_console(X1).

read_char(Message, X):-
  write_space, write(Message), nl,
  write_space, write('> '),
  get_char(X).
  
text_menu:-
	clear_console(30), nl,
	menu_ascii_art,
	write_space, write('1 - player vs player'),nl,
	write_space, write('2 - player vs cpu'),nl,
	write_space, write('3 - cpu vs cpu'),nl,
	write_space, write('4 - exit'),nl,
	read_char('Introduza uma opcao valida', C),
	menu_handler(C).	
	
menu_handler('1'):- start_PvP.
menu_handler('2'):- start_PvCPU1.
menu_handler('3'):- start_CPU2vCPU1.
menu_handler('4'):- write('EXITING..').
menu_handler(_):- text_menu.
	
	
nodes:- intro_menu.


  
