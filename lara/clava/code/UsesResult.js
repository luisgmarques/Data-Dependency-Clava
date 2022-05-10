class UsesResult {

	constructor(scope, ref, name, use, line) {
		this.scope = scope
		this.ref = ref
		this.name = name
		this.uses = [use]
		this.line = line
	}

	add_use(new_use) {
		this.uses.push(new_use)
	}

	print(t) {
		t++
		print('\t'.repeat(t)) 
		println("Scope: " + this.scope)
		print('\t'.repeat(t)) 
		println("Ref: " + this.ref)
		print('\t'.repeat(t)) 
		println("Name: " + this.name)
		print('\t'.repeat(t)) 
		print("Uses: ")
		for (let i = 0; i < this.uses.length; i++) {
			if (i + 1 == this.uses.length)
				print(this.uses[i])
			else
				print(this.uses[i] + ', ')
		}
		println()
		print('\t'.repeat(t)) 
		println("Line: " + this.line)
		println('\n')
	}

	equals(name) {
		if (name === this.name)
			return true
		return false
	}

}
