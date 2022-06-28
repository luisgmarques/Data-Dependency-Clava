laraImport("weaver.Query")
laraImport("lara.clava.code.UsesResult")
laraImport("lara.Io")
laraImport("clava.Clava")
laraImport("lara.Platforms")


if(Platforms.isWindows())
	var srcFolder = Io.getPath("..\\Data-Dependency-Clava\\src");
else
	var srcFolder = Io.getPath("../Data-Dependency-Clava/src")

var srcFile = Io.getPath(srcFolder, "matmul.c");

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


let scopes = Query.search("body")
scopes_results = {}
for(let scope of scopes) {

	if (scope.parent.name !== undefined) {
		if (!key_exists(scopes_results, scope.parent.name)) {
			scopes_results[scope.parent.name] = new Array()
		}
	}
	
	results = {}

	for (let descendant of scope.descendants) {
		if (descendant.instanceOf("varref")) {
		
			if (descendant.decl !== undefined) {
				let usesResult = new UsesResult(scope.parent.name + " " + scope.parent.joinPointType,descendant.kind, descendant.name, descendant.use, descendant.line)
				
				if (!key_exists(results, descendant.decl.name)) {
					
					results[descendant.decl.name] = new Array()
				}
				results[descendant.decl.name].push(usesResult)
			}
		}
	}

	if(scope.parent.name !== undefined) {
		scopes_results[scope.parent.name].push(results)
	}

}


let t = 1
for (let [scope, variables] of Object.entries(scopes_results)) {
	
	print('Scope: ')
	println(scope)
	for (let variable of variables) {
		
		for (let [key, value] of Object.entries(variable)) {
			
			print('\t'.repeat(t))
			
			print('Var: ')
			println(key)
			print_results(value, t)
		}
	}
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