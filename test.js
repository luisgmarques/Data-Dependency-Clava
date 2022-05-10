laraImport("weaver.Query")
laraImport("lara.clava.code.UsesResult")
laraImport("lara.Io")
laraImport("clava.Clava")

//var srcFolder = Io.getPath("C:\\Users\\Luis\\Desktop\\PI\\src");
var srcFolder = Io.getPath("/home/luis/Desktop/FEUP/PI/src");
var srcFile = Io.getPath(srcFolder, "function.c");

//println(Io.readFile(srcFile));

Query.root().addFileFromPath(srcFile)

Clava.rebuild()

let variables = []

function dump($jp, prefix) {
	prefix = prefix === undefined ? "" : prefix;
	
	//println(prefix + $jp.joinPointType);

	const newPrefix = prefix + "  ";
	for(let child of $jp.children) {
		if(child.instanceOf("varref")) {
			analyse(child)
		}
		dump(child, newPrefix);
	}
}

function printValues(obj) {
	for(const key in obj) 
		println(obj[key])
	println()
}

//println(Query.root().ast)
//println(Query.search("varref").get())
function analyse(v) {
	if (!var_exists(v)) {

		let variable = {
			name: v.name,
			accessType: v.use,
		}
		variables.push(variable)
	}
	else 
		add_access(v)
} 

function get_uses($jp) {
	for(let jpChild of $jp.children) {
		println(jpChild.joinPointType.trim())
		if (jpChild.joinPointType.trim() === "varref") {
			println(jpChild)
			println(jpChild.name)
			analyse(jpChild)
		}
		get_uses()
	}

}

function var_exists(variable) {
	for (let v of variables)
		if (v.name === variable.name)
			return true
	return false
}

function add_access(variable) {
	for (let v of variables)
		if (v.name === variable.name)
			v.accessType = [v.accessType, variable.use]
}
//println(Query.search("varref").first().name)
/*for(let nodes of Query.search("body").search("varref").chain()) {
	println("Scope at line: " + nodes["body"].line);
	println("Varref "+nodes["varref"].name +" of type: " + nodes["varref"].decl.line);	
}*/

let scopes = Query.search("body")
scopes_results = {}
for(let scope of scopes) {

	if (scope.parent.name !== undefined) {
		if (!key_exists(scopes_results, scope.parent.name)) {
			scopes_results[scope.parent.name] = new Array()
		}
		// FUCTIONS SCOPES
		//println("Scope: " + scope.parent.name + " " + scope.parent.joinPointType)
		if(scope.parent.children.length > 1) { 
			// FUNCTION WITH ARGUMENTS
			
			if (scope.parent.name === "main") {
				// MAIN FUCNTION
				
			}
			
			for(let child of scope.parent.children) {
				if(child.name !== undefined) {
					print("Arg: ")
					println(child)
				}
			}
			//println()
		}
		else { 
			// NO ARGUMENTS
			if (scope.parent.name === "main") {
				// MAIN FUCNTION

				let descendants = scope.descendants
				for (let descendant of descendants) {
					if (descendant.instanceOf("varref")) {

					}
				}
			}

		}
	}
	else {
		// FOR WHILE IF SCOPES
		//println("Scope " + scope.parent.joinPointType)
	}


//	let varref  = scope.search("varref")
	/*let varrefs  = Query.searchFrom(scope, "varref");

	for (let varref of varrefs.get()) {
		println("Varref: "+varref)
	}

	for (let stmt of scope.allStmts) {
		println("Statement: " + stmt)
	}
	println()
*/
	
	results = {}

	for (let descendant of scope.descendants) {
		//println("Descendant: " + descendant.joinPointType)
		if (descendant.instanceOf("varref")) {
			//println("kind: "+descendant.kind)
			//println("Name: "+descendant.name)
			//println("r/w/rw: "+descendant.use)
			
				if (descendant.decl !== undefined) {
					let usesResult = new UsesResult(scope.parent.name + " " + scope.parent.joinPointType,descendant.kind, descendant.name, descendant.use, descendant.line)
					
					if (!key_exists(results, descendant.decl.name)) {
						
						results[descendant.decl.name] = new Array()
					}
					results[descendant.decl.name].push(usesResult)
				}
				//let usesResult = new UsesResult(scope.parent.name + " " + scope.parent.joinPointType,descendant.kind, descendant.name, descendant.use)

				//results.push(usesResult)
			
			/*else {
				for (let result of results) {
					if (result.equals(descendant.name)) {
						result.add_use(descendant.use)
					}
				}
			}*/
	
		}
		//println()
	}
	
	scopes_results[scope.parent.name].push(results)

}


let t = 1
for (let [key, value] of Object.entries(scopes_results)) {
	
	print('Scope: ')
	println(key)
	for (let v of value) {
		
		for (let [key1, value1] of Object.entries(v)) {
			
			print('\t'.repeat(t))
			
			print('Key: ')
			println(key1)
			print_results(value1, t)
		}
	}



	/*
	println('\n---- DUMP ----')
	print(scope.dump)
	println('-- END DUMP --\n')
	*/
	//let jps = scope.search("varref")

	/*for(let jp of jps) {
		print("kind: "+jp.kind)
		print(" - name: "+jp.name)
		print(" -  " )
		println(" - r/w/rw: "+jp.use)
	}*/
}


function key_exists(obj, decl) {
	for (const [key, value] of Object.entries(obj)) {
		if (key === decl) {
			return true
		}
	}
	return false
}


function print_results(results, t) {
	for (let result of results) {
		result.print(t)
	}
}

function var_exists(variable, variables) {
	for (let v of variables) {
		if (v.name === variable)
			return true
	}
	return false
}

let ast = Query.root().dump
//print(ast)
//println(ast)
//dump(Query.root())

//println(variables.forEach(printValues))

